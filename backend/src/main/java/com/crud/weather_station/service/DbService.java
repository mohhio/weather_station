package com.crud.weather_station.service;

import com.crud.weather_station.domain.Humidity;
import com.crud.weather_station.domain.Temperature;
import com.crud.weather_station.repository.HumidityRepository;
import com.crud.weather_station.repository.TemperatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DbService {
    @Autowired
    private TemperatureRepository temperatureRepository;
    @Autowired
    private HumidityRepository humidityRepository;

    public List<Temperature> getAllTemperatures() {
        return temperatureRepository.findAll();
    }

    public Temperature saveTemperature(final Temperature temperature) {
        return temperatureRepository.save(temperature);
    }

    public void deleteTemperature(final Long id) {
        temperatureRepository.deleteById(id);
    }

    public List<Humidity> getAllHumidity() {
        return humidityRepository.findAll();
    }

    public Humidity saveHumidity(Humidity humidity) {
        return humidityRepository.save(humidity);
    }

    public void deleteHumidity(Long id) {
        humidityRepository.deleteById(id);
    }
}
