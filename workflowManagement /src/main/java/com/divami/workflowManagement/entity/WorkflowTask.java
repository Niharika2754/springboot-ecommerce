package com.divami.workflowManagement.entity;

import com.divami.workflowManagement.enums.TaskStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class WorkflowTask {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    private WorkFlowInstance workflowInstance;

    @ManyToOne
    private WorkflowStep workflowStep;

    private String taskName;
    private String assignedTo;


    @Enumerated(EnumType.STRING)
    private TaskStatus TaskStatus;

    private boolean adhoc;
}