package com.crud.weather_station.controller;

import com.crud.weather_station.domain.Temperature;
import com.crud.weather_station.domain.TemperatureDto;
import com.crud.weather_station.mapper.TemperatureMapper;
import com.crud.weather_station.service.DbService;
import com.google.gson.Gson;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = TemperatureController.class)
public class TemperatureControllerTestSuite {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private TemperatureMapper temperatureMapper;
    @MockBean
    private DbService dbService;

    @Test
    public void shouldGetAllTemperatures() throws Exception{
        //Given
        List<Temperature> temperatureList = new ArrayList<>();
        temperatureList.add(new Temperature(1L, "test", 1.0));
        List<TemperatureDto> temperatureDtoList = new ArrayList<>();
        temperatureDtoList.add(new TemperatureDto(1L, "test", 1.0));
        when(dbService.getAllTemperatures()).thenReturn(temperatureList);
        when(temperatureMapper.mapToTemperatureDto(temperatureList)).thenReturn(temperatureDtoList);

        //When & Then
        mockMvc.perform(MockMvcRequestBuilders.get("/api/temperature").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].dateTime").value("test"))
                .andExpect(jsonPath("$[0].value").value(1.0));
        verify(dbService, times(1)).getAllTemperatures();
    }

    @Test
    public void shouldCreateTemperature() throws Exception{
        //Given
        Temperature temperature = new Temperature(1L, "test", 1.0);
        when(temperatureMapper.mapToTemperature(any(TemperatureDto.class))).thenReturn(temperature);
        Gson gson = new Gson();
        String gsonContent = gson.toJson(temperature);

        //When & Then
        mockMvc.perform(MockMvcRequestBuilders.post("/api/temperature")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(gsonContent))
                .andExpect(status().isOk());
        verify(dbService, times(1)).saveTemperature(temperature);
    }

    @Test
    public void shouldUpdateTemperature() throws Exception{
        //Given
        Temperature temperature = new Temperature(1L, "test", 1.0);
        TemperatureDto temperatureDto = new TemperatureDto(1L, "test", 1.0);
        when(temperatureMapper.mapToTemperature(any(TemperatureDto.class))).thenReturn(temperature);
        when(temperatureMapper.mapToTemperatureDto(any(Temperature.class))).thenReturn(temperatureDto);
        when(dbService.saveTemperature(any(Temperature.class))).thenReturn(temperature);
        Gson gson = new Gson();
        String gsonContent = gson.toJson(temperatureDto);

        //When & Then
        mockMvc.perform(MockMvcRequestBuilders.put("/api/temperature")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(gsonContent))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.dateTime").value("test"))
                .andExpect(jsonPath("$.value").value(1.0));
        verify(dbService, times(1)).saveTemperature(temperature);
    }

    @Test
    public void shouldDeleteTemperature() throws Exception{
        //Given &When & Then
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/temperature/1"))
                .andExpect(status().isOk());
        verify(dbService, times(1)).deleteTemperature(1L);
    }
}
