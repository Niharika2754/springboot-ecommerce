package com.divami.workflow.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "workflow_step")
public class WorkflowStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String role;

    private Boolean isStart;

    private Boolean isEnd;

    private Boolean isParallel;

    @ManyToOne
    @JoinColumn(name = "workflow_definition_id")
    private WorkflowDefinition workflowDefinition;

    public WorkflowStep() {}

    // Getters and Setters

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getRole() { return role; }

    public Boolean getIsStart() { return isStart; }

    public Boolean getIsEnd() { return isEnd; }

    public Boolean getIsParallel() { return isParallel; }

    public void setName(String name) { this.name = name; }

    public void setRole(String role) { this.role = role; }

    public void setIsStart(Boolean isStart) { this.isStart = isStart; }

    public void setIsEnd(Boolean isEnd) { this.isEnd = isEnd; }

    public void setIsParallel(Boolean isParallel) { this.isParallel = isParallel; }

    public void setWorkflowDefinition(WorkflowDefinition workflowDefinition) {
        this.workflowDefinition = workflowDefinition;
    }
}