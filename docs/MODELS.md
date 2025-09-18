
# 📋 Modelos de Datos - Sistema de Autenticación

## User
Representa un usuario registrado en el sistema.

| Campo | Tipo | Descripción | Ejemplo/Notas |
|-------|------|-------------|---------------|
| `id` | string (UUID) | Identificador único | `"4e4a2b1a-3d1b-4f9d-9c22-12ab34cd56ef"` |
| `email` | string | Email en minúsculas | `"user@example.com"` |
| `password_hash` | string | Hash seguro de la contraseña | `"$argon2id$v=19$m=65536,t=3,p=1$..."` |
| `email_verified_at` | string|null | Fecha de verificación | `null` o `"2025-09-15T10:05:00.000Z"` |
| `role` | string | Rol del usuario | `"user"` o `"admin"` |
| `created_at` | string (ISO) | Fecha de creación | `"2025-09-15T10:05:00.000Z"` |
| `updated_at` | string (ISO) | Última actualización | `"2025-09-15T10:05:00.000Z"` |

**Ejemplo completo de User:**
```json
{
  "id": "4e4a2b1a-3d1b-4f9d-9c22-12ab34cd56ef",
  "email": "user@example.com",
  "password_hash": "$argon2id$v=19$m=65536,t=3,p=1$...",
  "email_verified_at": null,
  "role": "user",
  "created_at": "2025-09-15T10:05:00.000Z",
  "updated_at": "2025-09-15T10:05:00.000Z"
}


//Agregar las entidades faltantes!