package com.spring.carebookie.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum BucketName {

    PROFILE_IMAGE("care-bookie-image-proifile");

    private final String bucketName;

}
