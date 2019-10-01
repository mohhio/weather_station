package com.crud.weather_station.controller;

import com.crud.weather_station.domain.HumidityDto;
import com.crud.weather_station.mapper.HumidityMapper;
import com.crud.weather_station.service.DbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/humidity")
@CrossOrigin("*")
public class HumidityController {
    @Autowired
    private HumidityMapper humidityMapper;
    @Autowired
    private DbService dbService;


    @RequestMapping(method = RequestMethod.GET)
    public List<HumidityDto> getAllHumidity() {
        return humidityMapper.mapToHumidityDto(dbService.getAllHumidity());
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createHumidity(@RequestBody HumidityDto humidityDto) {
        dbService.saveHumidity(humidityMapper.mapToHumidity(humidityDto));
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public HumidityDto updateHumidity(@RequestBody HumidityDto humidityDto) {
        return humidityMapper.mapToHumidotyDto(dbService.saveHumidity(humidityMapper.mapToHumidity(humidityDto)));
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public void deleteHumidity(@PathVariable Long id) {
        dbService.deleteHumidity(id);
    }
}
