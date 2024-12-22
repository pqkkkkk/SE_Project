package com.introduce2se.seproject.payment.dto;

import lombok.Data;

@Data
public class PaymentInfoDto {
    private int amount;
    private String orderDescription;
    private String orderId;
    private String orderType;
    private String language;
    private String bankCode;
}
