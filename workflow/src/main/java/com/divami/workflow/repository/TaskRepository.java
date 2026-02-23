package com.divami.workflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.divami.workflow.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByWorkflowInstanceIdAndStatus(Long instanceId, String status);
}
