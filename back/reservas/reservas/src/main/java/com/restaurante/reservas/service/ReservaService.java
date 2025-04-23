package com.restaurante.reservas.service;

import com.restaurante.reservas.model.Reserva;
import com.restaurante.reservas.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> obtenerPorId(Long id) {
        return reservaRepository.findById(id);
    }

    public Reserva crear(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public Reserva actualizar(Long id, Reserva reservaActualizada) {
        return reservaRepository.findById(id).map(reserva -> {
            reserva.setNombreCliente(reservaActualizada.getNombreCliente());
            reserva.setContacto(reservaActualizada.getContacto());
            reserva.setMesa(reservaActualizada.getMesa());
            reserva.setFechaHora(reservaActualizada.getFechaHora());
            return reservaRepository.save(reserva);
        }).orElse(null);
    }

    public void eliminar(Long id) {
        reservaRepository.deleteById(id);
    }
}
