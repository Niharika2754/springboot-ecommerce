package com.divami.workflowManagement.engine;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.divami.workflowManagement.entity.WorkFlowInstance;
import com.divami.workflowManagement.entity.WorkflowDefinition;
import com.divami.workflowManagement.entity.WorkflowStep;
import com.divami.workflowManagement.entity.WorkflowTask;
import com.divami.workflowManagement.entity.WorkflowTransition;
import com.divami.workflowManagement.enums.InstanceStatus;
import com.divami.workflowManagement.enums.StepType;
import com.divami.workflowManagement.enums.TaskStatus;
import com.divami.workflowManagement.repo.WorkflowDefinitionRepo;
import com.divami.workflowManagement.repo.WorkflowInstanceRepo;
import com.divami.workflowManagement.repo.WorkflowStepRepo;
import com.divami.workflowManagement.repo.WorkflowTaskRepo;
import com.divami.workflowManagement.repo.WorkflowTransitionRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class WorkflowEngineService {

    private final WorkflowDefinitionRepo definitionRepo;
    private final WorkflowStepRepo stepRepo;
    private final WorkflowInstanceRepo instanceRepo;
    private final WorkflowTransitionRepo transitionRepo;
    private final WorkflowTaskRepo taskRepo;

    @Transactional
    public WorkFlowInstance startWorkflow(String workflowCode,String entityType, Long entityId){


        WorkflowDefinition definition = definitionRepo.findByCodeAndIsActiveTrue(workflowCode);

        if(definition == null){
            throw new RuntimeException("No active workflow definition found for code: " + workflowCode);
        }

        WorkflowStep start = stepRepo.findByWorkflowDefinitionIdAndStepType(definition.getId(),StepType.START);
        if(start == null){
            throw new RuntimeException("No start step found for workflow definition: " + definition.getId());
        }


        WorkFlowInstance instance = new WorkFlowInstance();
        instance.setWorkflowDefinition(definition);
        instance.setEntityType(entityType);
        instance.setEntityId(entityId);
        instance.setCurrentStep(start);
        instance.setStatus(InstanceStatus.RUNNING);
        instanceRepo.save(instance);



        moveNext(instance,Map.of());
        return instance;


               

    }

    public void moveNext(WorkFlowInstance instance, Map<String,Object> data){

        WorkflowStep currentStep = instance.getCurrentStep();
        List<WorkflowTransition> transitions = transitionRepo.findByFromStep(currentStep);

        //  assume 
        WorkflowTransition choosen = transitions.get(0);

        WorkflowStep nextStep = choosen.getToStep();

        instance.setCurrentStep(nextStep);
        instanceRepo.save(instance);

        if(nextStep.getStepType() == StepType.END){
            instance.setStatus(InstanceStatus.COMPLETED);
            instanceRepo.save(instance);
        }

        if(nextStep.getStepType() == StepType.USER_TASK){
            //create task
            createTask(instance, nextStep);
        }

        //system task ? execute and move next automatically

    }

    public void createTask(WorkFlowInstance instance, WorkflowStep step){
        WorkflowTask task = new WorkflowTask();
        task.setWorkflowInstance(instance);
        task.setWorkflowStep(step);
        task.setTaskName(step.getStepKey());
        task.setAssignedTo(step.getActor());
        task.setTaskStatus(TaskStatus.PENDING);

        taskRepo.save(task);


    }

    public void completeTask(Long taskId){
        WorkflowTask task = taskRepo.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found: " + taskId));
        
        task.setTaskStatus(TaskStatus.COMPLETED);
        taskRepo.save(task);

        WorkFlowInstance instance = task.getWorkflowInstance();

        moveNext(instance,Map.of());

    }


    
}
