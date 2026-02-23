package com.divami.workflow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflow.entity.WorkflowStep;

public interface WorkflowStepRepository extends JpaRepository<WorkflowStep, Long> {

    Optional<WorkflowStep> findByWorkflowDefinitionIdAndIsStartTrue(Long workflowId);

    List<WorkflowStep> findByWorkflowDefinitionId(Long workflowId);
}
