package com.divami.workflow.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "workflow_transition")
public class WorkflowTransition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action; // APPROVED / REJECTED

    @ManyToOne
    @JoinColumn(name = "from_step_id")
    private WorkflowStep fromStep;

    @ManyToOne
    @JoinColumn(name = "to_step_id")
    private WorkflowStep toStep;

    public WorkflowTransition() {}

    public Long getId() { return id; }

    public String getAction() { return action; }

    public WorkflowStep getFromStep() { return fromStep; }

    public WorkflowStep getToStep() { return toStep; }

    public void setAction(String action) { this.action = action; }

    public void setFromStep(WorkflowStep fromStep) { this.fromStep = fromStep; }

    public void setToStep(WorkflowStep toStep) { this.toStep = toStep; }
}