package com.divami.workflowManagement.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.divami.workflowManagement.engine.WorkflowEngineService;
import com.divami.workflowManagement.entity.WorkFlowInstance;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/workflow")
public class WorkflowController {

    private final WorkflowEngineService workflowEngineService;

    @PostMapping("/start/{customerId}")
    public WorkFlowInstance startWorkflow(@PathVariable Long customerId){
        return workflowEngineService.startWorkflow("CUSTOMER_ONBOARDING", "CUSTOMER", customerId);

    }


    @PostMapping("/completeTask/{taskId}")
    public void complete(@PathVariable Long taskId){
        //fetch task
        //check if user is same as assigned to
        //mark task as completed
        //fetch transitions for the current step
        //evaluate conditions and move to next step
        workflowEngineService.completeTask(taskId);
    }

    
}
