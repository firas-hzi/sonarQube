package com.example.comparators;
import java.util.Comparator;

import com.example.models.Order;

public class OrderListComparator implements Comparator<Order> {

    @Override
    public int compare(Order o1, Order o2) {
        int result = 0;
        if (o1.getOrderId().compareTo(o2.getOrderId()) > 0) {
            result = 1;
        } else if (o1.getOrderId().compareTo(o2.getOrderId()) < 0) {
            result = -1;
        }
        return result;
    }
}