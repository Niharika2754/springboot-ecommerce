package com.divami.workflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflow.entity.WorkflowTransition;

public interface WorkflowTransitionRepository extends JpaRepository<WorkflowTransition, Long> {

    List<WorkflowTransition> findByFromStepIdAndAction(Long stepId, String action);
}
