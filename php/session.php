<?php
declare(strict_types=1);
require_once __DIR__ . '/auth.php';

$user = getCurrentUser();
jsonResponse([
    'loggedIn' => $user !== null,
    'user' => $user,
]);
