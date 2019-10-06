package com.crud.weather_station.controller;

import com.crud.weather_station.domain.Humidity;
import com.crud.weather_station.domain.HumidityDto;
import com.crud.weather_station.mapper.HumidityMapper;
import com.crud.weather_station.service.DbService;
import com.google.gson.Gson;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = HumidityController.class)
public class HumidityControllerTestSuite {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    HumidityMapper humidityMapper;
    @MockBean
    DbService dbService;

    @Test
    public void shouldGetAllHumidity() throws Exception {
        //Given
        List<Humidity> humidityList = new ArrayList<>();
        humidityList.add(new Humidity(1L, "test", 1.0));
        List<HumidityDto> humidityDtoList = new ArrayList<>();
        humidityDtoList.add(new HumidityDto(1L, "test", 1.0));
        when(humidityMapper.mapToHumidityDto(humidityList)).thenReturn(humidityDtoList);
        when(dbService.getAllHumidity()).thenReturn(humidityList);

        //When & Then
        mockMvc.perform(get("/api/humidity").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].dateTime").value("test"))
                .andExpect(jsonPath("$[0].value").value(1.0));
        verify(dbService, times(1)).getAllHumidity();
    }

    @Test
    public void shouldCreateHumidity() throws Exception {
        //Given
        Humidity humidity = new Humidity(1L, "test", 1.0);
        when(humidityMapper.mapToHumidity(any(HumidityDto.class))).thenReturn(humidity);
        Gson gson = new Gson();
        String gsonContent = gson.toJson(humidity);

        //When & Then
        mockMvc.perform(post("/api/humidity")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(gsonContent))
                .andExpect(status().isOk());
        verify(dbService, times(1)).saveHumidity(humidity);
    }

    @Test
    public void shouldUpdateHumidity() throws Exception {
        //Given
        Humidity humidity = new Humidity(1L, "test", 1.0);
        HumidityDto humidityDto = new HumidityDto(1L, "test", 1.0);
        when(humidityMapper.mapToHumidityDto(any(Humidity.class))).thenReturn(humidityDto);
        when(humidityMapper.mapToHumidity(any(HumidityDto.class))).thenReturn(humidity);
        when(dbService.saveHumidity(any(Humidity.class))).thenReturn(humidity);
        Gson gson = new Gson();
        String gsonContent = gson.toJson(humidityDto);

        //When & Then
        mockMvc.perform(put("/api/humidity")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(gsonContent))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.dateTime").value("test"))
                .andExpect(jsonPath("$.value").value(1.0));
        verify(dbService, times(1)).saveHumidity(humidity);
    }

    @Test
    public void shouldDeleteHumidity() throws Exception {
        //Given & When & Then
        mockMvc.perform(delete("/api/humidity/1"))
                .andExpect(status().isOk());
        verify(dbService, times(1)).deleteHumidity(1L);
    }
}
