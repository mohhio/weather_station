package com.crud.weather_station.repository;

import com.crud.weather_station.domain.Humidity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface HumidityRepository extends CrudRepository<Humidity, Long> {
    @Override
    List<Humidity> findAll();

    @Override
    Humidity save(Humidity humidity);

    @Override
    void deleteById(Long id);
}
