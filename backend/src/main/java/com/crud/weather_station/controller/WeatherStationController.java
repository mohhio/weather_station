package com.crud.weather_station.controller;

import com.crud.weather_station.domain.HumidityDto;
import com.crud.weather_station.domain.TemperatureDto;
import com.crud.weather_station.mapper.HumidityMapper;
import com.crud.weather_station.mapper.TemperatureMapper;
import com.crud.weather_station.service.DbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class WeatherStationController {
    @Autowired
    private TemperatureMapper temperatureMapper;
    @Autowired
    private HumidityMapper humidityMapper;
    @Autowired
    private DbService dbService;

    @RequestMapping(method = RequestMethod.GET, value = "/temperature")
    public List<TemperatureDto> getAllTemperatures() {
        return temperatureMapper.mapToTemperatureDto(dbService.getAllTemperatures());
    }

    @RequestMapping(method = RequestMethod.POST, value = "/temperature", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createTemperature(@RequestBody TemperatureDto temperatureDto) {
        dbService.saveTemperature(temperatureMapper.mapToTemperature(temperatureDto));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/temperature", consumes = MediaType.APPLICATION_JSON_VALUE)
    public TemperatureDto updateTemperature(TemperatureDto temperatureDto) {
        return temperatureMapper.mapToTemperatureDto(dbService.saveTemperature(temperatureMapper.mapToTemperature(temperatureDto)));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/temperature/{id}")
    public void deleteTemperature(@PathVariable Long id) {
        dbService.deleteTemperature(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/humidity")
    public List<HumidityDto> getAllHumidity() {
        return humidityMapper.mapToHumidityDto(dbService.getAllHumidity());
    }

    @RequestMapping(method = RequestMethod.POST, value = "/humidity", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createHumidity(@RequestBody HumidityDto humidityDto) {
        dbService.saveHumidity(humidityMapper.mapToHumidity(humidityDto));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/humidity", consumes = MediaType.APPLICATION_JSON_VALUE)
    public HumidityDto updateHumidity(@RequestBody HumidityDto humidityDto) {
        return humidityMapper.mapToHumidotyDto(dbService.saveHumidity(humidityMapper.mapToHumidity(humidityDto)));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/humidity/{id}")
    public void deleteHumidity(@PathVariable Long id) {
        dbService.deleteHumidity(id);
    }
}
