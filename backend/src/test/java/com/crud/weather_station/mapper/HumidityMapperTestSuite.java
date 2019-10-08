package com.crud.weather_station.mapper;

import com.crud.weather_station.domain.Humidity;
import com.crud.weather_station.domain.HumidityDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(MockitoJUnitRunner.class)
public class HumidityMapperTestSuite {
    @InjectMocks
    private HumidityMapper humidityMapper;

    @Test
    public void testMapToHumidity() {
        //Given
        HumidityDto humidityDto = new HumidityDto(1L, "test", 1.0);
        //When
        Humidity humidity = humidityMapper.mapToHumidity(humidityDto);
        //Then
        assertNotNull(humidity);
        assertEquals(humidityDto.getId(), humidity.getId());
        assertEquals(humidityDto.getDateTime(), humidity.getDateTime());
        assertEquals(humidityDto.getValue(), humidity.getValue(), 0);
    }

    @Test
    public void testMapToHumidityDto() {
        //Given
        Humidity humidity = new Humidity(1L, "test", 1.0);
        //When
        HumidityDto humidityDto = humidityMapper.mapToHumidityDto(humidity);
        //Then
        assertNotNull(humidityDto);
        assertEquals(humidity.getId(), humidityDto.getId());
        assertEquals(humidity.getDateTime(), humidityDto.getDateTime());
        assertEquals(humidity.getValue(), humidityDto.getValue(), 0);
    }

    @Test
    public void mapToHumidityDtoList() {
        //Given
        List<Humidity> emptyHumidityList = new ArrayList<>();
        Humidity humidity = new Humidity(1L, "test", 1.0);
        List<Humidity> humidityList = Arrays.asList(humidity);
        //When
        List<HumidityDto> emptyHumidityDtoList = humidityMapper.mapToHumidityDto(emptyHumidityList);
        List<HumidityDto> humidityDtoList = humidityMapper.mapToHumidityDto(humidityList);
        //Then
        assertNotNull(emptyHumidityDtoList);
        assertNotNull(humidityDtoList);
        assertEquals(emptyHumidityList.size(), emptyHumidityDtoList.size());
        assertEquals(humidity.getId(), humidityDtoList.get(0).getId());
        assertEquals(humidity.getDateTime(), humidityDtoList.get(0).getDateTime());
        assertEquals(humidity.getValue(), humidityDtoList.get(0).getValue(), 0);
    }
}
