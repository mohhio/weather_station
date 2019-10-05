package com.crud.weather_station.mapper;

import com.crud.weather_station.domain.Temperature;
import com.crud.weather_station.domain.TemperatureDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TemperatureMapper {
    public Temperature mapToTemperature(final TemperatureDto temperatureDto) {
        return new Temperature(
                temperatureDto.getId(),
                temperatureDto.getDateTime(),
                temperatureDto.getValue());
    }

    public TemperatureDto mapToTemperatureDto(final Temperature temperature) {
        return new TemperatureDto(
                temperature.getId(),
                temperature.getDateTime(),
                temperature.getValue());
    }

    public List<TemperatureDto> mapToTemperatureDto(final List<Temperature> temperatureList) {
        return temperatureList.stream()
                .map(temperature -> new TemperatureDto(
                        temperature.getId(),
                        temperature.getDateTime(),
                        temperature.getValue()))
                .collect(Collectors.toList());
    }
}
