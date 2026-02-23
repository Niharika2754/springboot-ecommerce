package com.divami.workflow.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String role;

    private String status;

    @ManyToOne
    @JoinColumn(name = "workflow_instance_id")
    private WorkflowInstance workflowInstance;

    @ManyToOne
    @JoinColumn(name = "step_id")
    private WorkflowStep step;

    public Task() {}

    public Long getId() { return id; }

    public String getRole() { return role; }

    public String getStatus() { return status; }

    public WorkflowInstance getWorkflowInstance() { return workflowInstance; }

    public WorkflowStep getStep() { return step; }

    public void setRole(String role) { this.role = role; }

    public void setStatus(String status) { this.status = status; }

    public void setWorkflowInstance(WorkflowInstance workflowInstance) {
        this.workflowInstance = workflowInstance;
    }

    public void setStep(WorkflowStep step) {
        this.step = step;
    }
}