package com.tymnt.main.repositories;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tymnt.main.entities.FeedRequest;

public interface FeedRepository extends JpaRepository<FeedRequest, Long> {

	List<FeedRequest> findByAcceptedBy(String acceptedBy);
}
