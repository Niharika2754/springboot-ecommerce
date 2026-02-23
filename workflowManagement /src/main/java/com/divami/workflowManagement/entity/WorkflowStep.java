package com.divami.workflowManagement.entity;
import com.divami.workflowManagement.enums.StepType;

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
public class WorkflowStep {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private WorkflowDefinition workflowDefinition;

    private String stepKey;
    private String stepName;

    @Enumerated(EnumType.STRING)
    private StepType stepType;

    private String actor;

}
