/**
 * Doctor Routes
 * -------------
 * This router handles all doctor-specific API endpoints.
 *
 * Features:
 * - All routes are protected by authentication middleware
 * - Only users with the "doctor" role can access these routes
 * - Provides endpoints for viewing and canceling appointments
 */

const express = require("express");
const { getMyAppointments, cancelAppointment } = require("../controllers/doctorController");
const { authenticateToken } = require("../middleware/auth"); // JWT authentication
const { requireDoctor } = require("../middleware/rbac"); // Role-based access for doctors

const router = express.Router(); // Initialize Express Router

// ---------------------- Middleware ----------------------

// Ensure all doctor routes are protected by authentication
router.use(authenticateToken);

// Ensure only users with "doctor" role can access these routes
router.use(requireDoctor);

// ---------------------- Routes ----------------------

/**
 * @route   GET /api/doctors/appointments
 * @desc    Retrieve all appointments assigned to the logged-in doctor
 * @access  Private (Doctor only)
 */
router.get("/appointments", getMyAppointments);

/**
 * @route   PUT /api/doctors/appointments/:id/cancel
 * @desc    Cancel an appointment assigned to the logged-in doctor
 * @param   {string} id - The ID of the appointment
 * @access  Private (Doctor only)
 */
router.put("/appointments/:id/cancel", cancelAppointment);

// ---------------------- Export ----------------------
module.exports = router;
