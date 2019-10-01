package com.crud.weather_station.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TemperatureDto {
    private Long id;
    private String dateTime;
    private Double value;
}
