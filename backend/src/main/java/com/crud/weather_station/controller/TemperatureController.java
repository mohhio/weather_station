package com.crud.weather_station.controller;

import com.crud.weather_station.domain.TemperatureDto;
import com.crud.weather_station.mapper.TemperatureMapper;
import com.crud.weather_station.service.DbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/temperature")
@CrossOrigin("*")
public class TemperatureController {
    @Autowired
    private TemperatureMapper temperatureMapper;
    @Autowired
    private DbService dbService;

    @RequestMapping(method = RequestMethod.GET)
    public List<TemperatureDto> getAllTemperatures() {
        return temperatureMapper.mapToTemperatureDto(dbService.getAllTemperatures());
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createTemperature(@RequestBody TemperatureDto temperatureDto) {
        dbService.saveTemperature(temperatureMapper.mapToTemperature(temperatureDto));
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public TemperatureDto updateTemperature(TemperatureDto temperatureDto) {
        return temperatureMapper.mapToTemperatureDto(dbService.saveTemperature(temperatureMapper.mapToTemperature(temperatureDto)));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public void deleteTemperature(@PathVariable Long id) {
        dbService.deleteTemperature(id);
    }
}
