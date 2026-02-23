package com.divami.workflowManagement.entity;

import com.divami.workflowManagement.enums.InstanceStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;


@Entity
@Data
public class WorkFlowInstance {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String entityType;

    private Long entityId;

    @ManyToOne
    private WorkflowDefinition workflowDefinition;

    @ManyToOne
    private WorkflowStep currentStep;

    @Enumerated(EnumType.STRING)
    private InstanceStatus status;


}
