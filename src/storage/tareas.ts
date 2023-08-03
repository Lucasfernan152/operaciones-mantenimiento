type User = {
    id: string;
    local: boolean;
    deleted: boolean;
    estado: string;
    creador: {
        id: string;
        local: boolean;
        deleted: boolean;
        mail: string;
        nombre: string;
        rol: string;
    };
    elemento: {
        id: number;
        local: boolean;
        deleted: boolean;
        nombre: string;
    };
    ejecutor: {
        id: string;
        local: boolean;
        deleted: boolean;
        mail: string;
        nombre: string;
        rol: string;
    };
    prioridad: string;
    equipo: string;
    fechaAviso: string;
    fechaProgramacion: string | null;
    observacionPrevia: string;
    observacionFinal: string;
};

export const usuarios: User[] = [
  {
    id: "1",
    local: true,
    deleted: false,
    estado: "PENDIENTE",
    creador: {
        id: "123",
        local: true,
        deleted: false,
        mail: "creador@example.com",
        nombre: "Creador Principal",
        rol: "ADMIN"
    },
    elemento: {
        id: 12314,
        local: true,
        deleted: false,
        nombre: "Elemento 1"
    },
    ejecutor: {
        id: "124",
        local: true,
        deleted: false,
        mail: "usuario1@example.com",
        nombre: "Usuario 1",
        rol: "USUARIO"
    },
    prioridad: "ALTA",
    equipo: "BOOSTER",
    fechaAviso: "20/4/2023",
    fechaProgramacion: null,
    observacionPrevia: "Esta es una observación previa",
    observacionFinal: "Esta es una observación final"
  },
  {
    id: "10",
    local: true,
    deleted: false,
    estado: "NO REALIZADO",
    creador: {
        id: "123",
        local: true,
        deleted: false,
        mail: "creador@example.com",
        nombre: "Creador Principal",
        rol: "ADMIN"
    },
    elemento: {
        id: 12314,
        local: true,
        deleted: false,
        nombre: "Elemento 10"
    },
    ejecutor: {
        id: "134",
        local: true,
        deleted: false,
        mail: "usuario10@example.com",
        nombre: "Usuario 10",
        rol: "USUARIO"
    },
    prioridad: "ALTA",
    equipo: "BOOSTER",
    fechaAviso: "20/4/2023",
    fechaProgramacion: null,
    observacionPrevia: "Esta es una observación previa",
    observacionFinal: "Esta es una observación final"
  },
  
  {
    id: "10",
    local: true,
    deleted: false,
    estado: "NO REALIZADO",
    creador: {
        id: "123",
        local: true,
        deleted: false,
        mail: "creador@example.com",
        nombre: "Creador Principal",
        rol: "ADMIN"
    },
    elemento: {
        id: 12314,
        local: true,
        deleted: false,
        nombre: "Elemento 10"
    },
    ejecutor: {
        id: "134",
        local: true,
        deleted: false,
        mail: "usuario10@example.com",
        nombre: "Usuario 10",
        rol: "USUARIO"
    },
    prioridad: "ALTA",
    equipo: "BOOSTER",
    fechaAviso: "20/4/2023",
    fechaProgramacion: null,
    observacionPrevia: "Esta es una observación previa",
    observacionFinal: "Esta es una observación final"
  },
  {
    id: "10",
    local: true,
    deleted: false,
    estado: "REALIZADO",
    creador: {
        id: "123",
        local: true,
        deleted: false,
        mail: "creador@example.com",
        nombre: "Creador Principal",
        rol: "ADMIN"
    },
    elemento: {
        id: 12314,
        local: true,
        deleted: false,
        nombre: "Elemento 10"
    },
    ejecutor: {
        id: "134",
        local: true,
        deleted: false,
        mail: "usuario10@example.com",
        nombre: "Usuario 10",
        rol: "USUARIO"
    },
    prioridad: "ALTA",
    equipo: "BOOSTER",
    fechaAviso: "20/4/2023",
    fechaProgramacion: null,
    observacionPrevia: "Esta es una observación previa",
    observacionFinal: "Esta es una observación final"
  },
  {
    id: "10",
    local: true,
    deleted: false,
    estado: "PROGRAMADO",
    creador: {
        id: "123",
        local: true,
        deleted: false,
        mail: "creador@example.com",
        nombre: "Creador Principal",
        rol: "ADMIN"
    },
    elemento: {
        id: 12314,
        local: true,
        deleted: false,
        nombre: "Elemento 10"
    },
    ejecutor: {
        id: "134",
        local: true,
        deleted: false,
        mail: "usuario10@example.com",
        nombre: "Usuario 10",
        rol: "USUARIO"
    },
    prioridad: "ALTA",
    equipo: "BOOSTER",
    fechaAviso: "20/4/2023",
    fechaProgramacion: null,
    observacionPrevia: "Esta es una observación previa",
    observacionFinal: "Esta es una observación final"
  },
  {
    id: "10",
    local: true,
    deleted: false,
    estado: "PENDIENTE",
    creador: {
        id: "123",
        local: true,
        deleted: false,
        mail: "creador@example.com",
        nombre: "Creador Principal",
        rol: "ADMIN"
    },
    elemento: {
        id: 12314,
        local: true,
        deleted: false,
        nombre: "Elemento 10"
    },
    ejecutor: {
        id: "134",
        local: true,
        deleted: false,
        mail: "usuario10@example.com",
        nombre: "Usuario 10",
        rol: "USUARIO"
    },
    prioridad: "ALTA",
    equipo: "BOOSTER",
    fechaAviso: "20/4/2023",
    fechaProgramacion: null,
    observacionPrevia: "Esta es una observación previa",
    observacionFinal: "Esta es una observación final"
  },
  {
    id: "10",
    local: true,
    deleted: false,
    estado: "PENDIENTE",
    creador: {
        id: "123",
        local: true,
        deleted: false,
        mail: "creador@example.com",
        nombre: "Creador Principal",
        rol: "ADMIN"
    },
    elemento: {
        id: 12314,
        local: true,
        deleted: false,
        nombre: "Elemento 10"
    },
    ejecutor: {
        id: "134",
        local: true,
        deleted: false,
        mail: "usuario10@example.com",
        nombre: "Usuario 10",
        rol: "USUARIO"
    },
    prioridad: "ALTA",
    equipo: "BOOSTER",
    fechaAviso: "20/4/2023",
    fechaProgramacion: null,
    observacionPrevia: "Esta es una observación previa",
    observacionFinal: "Esta es una observación final"
  },
  {
    id: "10",
    local: true,
    deleted: false,
    estado: "PENDIENTE",
    creador: {
        id: "123",
        local: true,
        deleted: false,
        mail: "creador@example.com",
        nombre: "Creador Principal",
        rol: "ADMIN"
    },
    elemento: {
        id: 12314,
        local: true,
        deleted: false,
        nombre: "Elemento 10"
    },
    ejecutor: {
        id: "134",
        local: true,
        deleted: false,
        mail: "usuario10@example.com",
        nombre: "Usuario 10",
        rol: "USUARIO"
    },
    prioridad: "ALTA",
    equipo: "BOOSTER",
    fechaAviso: "20/4/2023",
    fechaProgramacion: null,
    observacionPrevia: "Esta es una observación previa",
    observacionFinal: "Esta es una observación final"
  },
]
