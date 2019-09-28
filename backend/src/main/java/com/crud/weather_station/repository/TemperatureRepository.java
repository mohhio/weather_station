package com.crud.weather_station.repository;

import com.crud.weather_station.domain.Temperature;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TemperatureRepository extends CrudRepository<Temperature, Long> {
    @Override
    List<Temperature> findAll();

    @Override
    Temperature save(Temperature temperature);

    @Override
    void deleteById(Long id);
}
