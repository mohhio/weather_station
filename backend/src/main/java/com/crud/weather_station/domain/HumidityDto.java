package com.crud.weather_station.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class HumidityDto {
    private Long id;
    private String dataTime;
    private Double value;
}
