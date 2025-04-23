package com.restaurante.reservas.controller;

import com.restaurante.reservas.model.Reserva;
import com.restaurante.reservas.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*") // Para permitir peticiones desde el frontend
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> listar() {
        return reservaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public Reserva obtenerPorId(@PathVariable Long id) {
        return reservaService.obtenerPorId(id).orElse(null);
    }

    @PostMapping
    public Reserva crear(@RequestBody Reserva reserva) {
        return reservaService.crear(reserva);
    }

    @PutMapping("/{id}")
    public Reserva actualizar(@PathVariable Long id, @RequestBody Reserva reserva) {
        return reservaService.actualizar(id, reserva);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        reservaService.eliminar(id);
    }
}
