package com.divami.workflow.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "workflow_instance")
public class WorkflowInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String businessKey;

    private String status;

    @ManyToOne
    @JoinColumn(name = "workflow_definition_id")
    private WorkflowDefinition workflowDefinition;

    @ManyToOne
    @JoinColumn(name = "current_step_id")
    private WorkflowStep currentStep;

    public WorkflowInstance() {}

    public Long getId() { return id; }

    public String getBusinessKey() { return businessKey; }

    public String getStatus() { return status; }

    public WorkflowStep getCurrentStep() { return currentStep; }

    public void setBusinessKey(String businessKey) { this.businessKey = businessKey; }

    public void setStatus(String status) { this.status = status; }

    public void setWorkflowDefinition(WorkflowDefinition workflowDefinition) {
        this.workflowDefinition = workflowDefinition;
    }

    public void setCurrentStep(WorkflowStep currentStep) {
        this.currentStep = currentStep;
    }
}