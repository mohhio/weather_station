package com.crud.weather_station.mapper;

import com.crud.weather_station.domain.Temperature;
import com.crud.weather_station.domain.TemperatureDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TemperatureMapperTestSuite {
    @Autowired
    private TemperatureMapper temperatureMapper;

    @Test
    public void testMapToTemperature() {
        //Given
        TemperatureDto temperatureDto = new TemperatureDto(1L, "test", 1.0);
        //When
        Temperature temperature = temperatureMapper.mapToTemperature(temperatureDto);
        //Then
        assertNotNull(temperature);
        assertEquals(temperatureDto.getId(), temperature.getId());
        assertEquals(temperatureDto.getDateTime(), temperatureDto.getDateTime());
        assertEquals(temperatureDto.getValue(), temperature.getValue());
    }

    @Test
    public void testMapToTemperatureDto() {
        //Given
        Temperature temperature = new Temperature(1L, "test", 1.0);
        //When
        TemperatureDto temperatureDto = temperatureMapper.mapToTemperatureDto(temperature);
        //Then
        assertNotNull(temperatureDto);
        assertEquals(temperature.getId(), temperatureDto.getId());
        assertEquals(temperature.getDateTime(), temperatureDto.getDateTime());
        assertEquals(temperature.getValue(), temperatureDto.getValue(), 0);
    }

    @Test
    public void testMapToTemperatureDtoList() {
        //Given
        List<Temperature> emptyTemperatureList = new ArrayList<>();
        Temperature temperature = new Temperature(1L, "test", 1.0);
        List<Temperature> temperatureList = Arrays.asList(temperature);
        //When
        List<TemperatureDto> emptyTemperatureDtoList = temperatureMapper.mapToTemperatureDto(emptyTemperatureList);
        List<TemperatureDto> temperatureDtoList = temperatureMapper.mapToTemperatureDto(temperatureList);
        //Then
        assertNotNull(emptyTemperatureDtoList);
        assertNotNull(temperatureDtoList);
        assertEquals(emptyTemperatureDtoList.size(), 0);
        assertEquals(temperature.getId(), temperatureDtoList.get(0).getId());
        assertEquals(temperature.getDateTime(), temperatureDtoList.get(0).getDateTime());
        assertEquals(temperature.getValue(), temperatureDtoList.get(0).getValue(), 0);
    }
}
