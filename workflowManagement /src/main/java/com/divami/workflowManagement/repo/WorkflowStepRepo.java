package com.divami.workflowManagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflowManagement.entity.WorkflowStep;
import com.divami.workflowManagement.enums.StepType;

public interface WorkflowStepRepo extends JpaRepository<WorkflowStep, Long>{
    
    WorkflowStep findByWorkflowDefinitionIdAndStepType(Long workflowDefinitionId, StepType stepType);

}
