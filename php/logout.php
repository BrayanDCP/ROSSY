<?php
declare(strict_types=1);
require_once __DIR__ . '/auth.php';

logoutUser();
jsonResponse(['success' => true, 'message' => 'Sesión cerrada.']);
