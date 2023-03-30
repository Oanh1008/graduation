package com.spring.carebookie.lombok;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TestLomBok {

    private String id;

    private String name;

    public static void main(String[] args) {
        TestLomBok lomBok = new TestLomBok("1", "@");
        System.out.println(lomBok.getName());
    }
}
