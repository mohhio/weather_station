package com.crud.weather_station.service;

import com.crud.weather_station.domain.Humidity;
import com.crud.weather_station.domain.Temperature;
import com.crud.weather_station.repository.HumidityRepository;
import com.crud.weather_station.repository.TemperatureRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class DbServiceTestSuite {
    @InjectMocks
    private DbService dbService;
    @Mock
    private TemperatureRepository temperatureRepository;
    @Mock
    private HumidityRepository humidityRepository;

    @Test
    public void testGetAllTemperature() {
        //Given
        Temperature temperature = new Temperature(1L, "test", 1.0);
        List<Temperature> temperatureList = new ArrayList<>();
        temperatureList.add(temperature);
        when(temperatureRepository.findAll()).thenReturn(temperatureList);
        //When
        List<Temperature> actualTemperatureList = dbService.getAllTemperatures();
        //Then
        assertEquals(temperatureList, actualTemperatureList);
    }

    @Test
    public void testGetAllHumidity() {
        //Given
        Humidity humidity = new Humidity(1L, "test", 1.0);
        List<Humidity> humidityList = new ArrayList<>();
        humidityList.add(humidity);
        when(humidityRepository.findAll()).thenReturn(humidityList);
        //When
        List<Humidity> actualHumidityList = dbService.getAllHumidity();
        //Then
        assertEquals(humidityList, actualHumidityList);
    }

    @Test
    public void testSaveTemperature() {
        //Given
        Temperature temperature = new Temperature(1L, "test", 1.0);
        when(temperatureRepository.save(temperature)).thenReturn(temperature);
        //When
        Temperature actualTemperature = dbService.saveTemperature(temperature);
        //Then
        assertEquals(temperature, actualTemperature);
    }

    @Test
    public void testSaveHumidity() {
        //Given
        Humidity humidity = new Humidity(1L, "test", 1.0);
        when(humidityRepository.save(humidity)).thenReturn(humidity);
        //When
        Humidity actualHumidity = dbService.saveHumidity(humidity);
        //Then
        assertEquals(humidity, actualHumidity);
    }

    @Test
    public void testDeleteTemperature() {
        //Given
        //When
        dbService.deleteTemperature(1L);
        //Then
        verify(temperatureRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeleteHumidity() {
        //Given
        //When
        dbService.deleteHumidity(1L);
        //Then
        verify(humidityRepository, times(1)).deleteById(1L);
    }
}
