package com.introduce2se.seproject.account.dao.feedback;

import com.introduce2se.seproject.account.model.Feedback;

import java.util.List;

public interface FeedbackDao {
    boolean AddFeedback(Feedback feedback);
    List<Feedback> GetFeedbackByDoctorId(int doctorId);
    List<Feedback> GetAllFeedback();
    Feedback GetFeedbackById(int feedbackId);
}
