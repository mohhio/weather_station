package com.crud.weather_station.mapper;

import com.crud.weather_station.domain.Humidity;
import com.crud.weather_station.domain.HumidityDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class HumidityMapper {
    public Humidity mapToHumidity(final HumidityDto humidityDto) {
        return new Humidity(
                humidityDto.getId(),
                humidityDto.getDataTime(),
                humidityDto.getValue());
    }

    public HumidityDto mapToHumidotyDto(final Humidity humidity) {
        return new HumidityDto(
                humidity.getId(),
                humidity.getDataTime(),
                humidity.getValue());
    }

    public List<HumidityDto> mapToHumidityDto(final List<Humidity> humidityList) {
        return humidityList.stream()
                .map(humidity -> new HumidityDto(
                        humidity.getId(),
                        humidity.getDataTime(),
                        humidity.getValue()))
                .collect(Collectors.toList());
    }
}
