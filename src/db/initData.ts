export const dbSchema = {
  professor: `
  CREATE TABLE public.professor (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    firstname varchar NOT NULL,
    lastname varchar NOT NULL,
    dni varchar NOT NULL,
    phone varchar NULL,
    address varchar NULL,
    CONSTRAINT "PK_39a6c8f16280dc3bc3ffdc41e02" PRIMARY KEY (id),
    CONSTRAINT "UQ_cbe54626844e25ae4c4d64ea6c3" UNIQUE (dni)
  );
  `,
  student: `
  CREATE TABLE public.student (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    firstname varchar NOT NULL,
    lastname varchar NOT NULL,
    dni varchar NOT NULL,
    phone varchar NULL,
    address varchar NULL,
    CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY (id),
    CONSTRAINT "UQ_e7c9aafa64237e394ec4d8a4f7b" UNIQUE (dni)
  );
  `,
  course: `
  CREATE TABLE public.course (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    fullname varchar NOT NULL,
    abbreviation varchar NOT NULL,
    credits int4 NOT NULL,
    description varchar NULL,
    "professorId" uuid NULL,
    CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY (id),
    CONSTRAINT "UQ_7e06972c6daa6428c24aa6fbaa7" UNIQUE (abbreviation),
    CONSTRAINT "FK_2f6d4e27887411ddb6ed55848f1" FOREIGN KEY ("professorId") REFERENCES public.professor(id)
  );
  `,
  enrollment: `
  CREATE TABLE public.enrollment (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "program" varchar NOT NULL,
    description varchar NOT NULL,
    "studentId" uuid NULL,
    CONSTRAINT "PK_7e200c699fa93865cdcdd025885" PRIMARY KEY (id),
    CONSTRAINT "FK_5ce702e71b98cc1bb37b81e83d8" FOREIGN KEY ("studentId") REFERENCES public.student(id)
  );
  `,
  enrollCourse: `
  CREATE TABLE public.enroll_course (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    state public."enroll_course_state_enum" NULL,
    "courseId" uuid NULL,
    "enrollmentId" uuid NULL,
    CONSTRAINT "PK_42dc132efd30f60930766b20331" PRIMARY KEY (id),
    CONSTRAINT "FK_130f77463ab072249b6a8f32572" FOREIGN KEY ("courseId") REFERENCES public.course(id),
    CONSTRAINT "FK_d7c8f0d3f8c74aab57b15e275e7" FOREIGN KEY ("enrollmentId") REFERENCES public.enrollment(id) ON DELETE CASCADE
  );
  `,
};

export const dbData = {
  professors: `
  INSERT INTO public.professor (id,firstname,lastname,dni,phone,address) VALUES
	 ('d5528d8a-b567-444f-b623-8b63ff7525b0','John','Doe','12345678','+1 555 123-4567','123 Main St, Anytown, USA'),
	 ('a048ccb8-c788-4f33-a52c-4a0a6b00d8c7','Jane','Doe','23456789','+1 555 234-5678','456 Elm St, Anytown, USA'),
	 ('77dfdfd4-bb08-4f2c-ab69-e67d886e2f15','Bob','Smith','34567890','+1 555 345-6789','789 Oak St, Anytown, USA'),
	 ('cb107373-cd8d-4b2c-9949-2c360f766adc','Alice','Johnson','45678901','+1 555 456-7890','321 Maple St, Anytown, USA'),
	 ('2885b88e-d39e-4110-9c68-a3b615148f4e','Tom','Brown','56789012','+1 555 567-8901','654 Pine St, Anytown, USA'),
	 ('d92d1737-b9dc-4eb6-9afd-eefe6e7bcba6','Emily','Davis','67890123','+1 555 678-9012','987 Cedar St, Anytown, USA'),
	 ('bea57008-927f-4873-8503-39035e144883','David','Wilson','78901234','+1 555 789-0123','246 Cherry St, Anytown, USA'),
	 ('07f17f66-1ee0-44ac-bac5-bae61c7d8efa','Sarah','Miller','89012345','+1 555 890-1234','369 Ash St, Anytown, USA'),
	 ('3d14af50-3951-4e1b-94c6-061853c2fcb5','Michael','Taylor','90123456','+1 555 901-2345','582 Walnut St, Anytown, USA'),
	 ('130a2e85-a084-4f36-8112-095d5bcfc80f','Ada Haydee','Pacheco Ismodes','30824022','+51 555 012 345','506 Mariscal Castilla Av, Mollendo, Perú');
  `,
  students: `
  INSERT INTO public.student (id,firstname,lastname,dni,phone,address) VALUES
	 ('56a14480-46d8-4217-ad91-b6201fab896f','Peter','Gonzalez','12345678','+1 555 123-4567','123 Main St, Anytown, USA'),
	 ('4c9e088c-5ff2-48d1-ae61-e8a7bf507b41','Emily','Garcia','23456789','+1 555 234-5678','456 Elm St, Anytown, USA'),
	 ('1287830d-2f8f-40cf-a32c-0a70ff825273','Kevin','Hernandez','34567890','+1 555 345-6789','789 Oak St, Anytown, USA'),
	 ('f5183f00-2dc7-43ba-986a-968dac871990','Mia Mauren','Ticona Verdeguer','45678901','+1 555 456-7890','321 Maple St, Anytown, USA'),
	 ('dee1e294-26a8-43ac-8440-efe4decb2e63','Donovan Ian','Ticona Verdeguer','56789012','+1 555 567-8901','654 Pine St, Anytown, USA'),
	 ('28f9d437-1008-43fd-8196-91b107c221bc','Sofia','Alvarez','67890123','+1 555 678-9012','987 Cedar St, Anytown, USA'),
	 ('2c76c147-ab3e-4e9e-8cfd-853ee6674e98','Juan','Reyes','78901234','+1 555 789-0123','246 Cherry St, Anytown, USA'),
	 ('3e80c0d7-f622-49c1-a026-b332e4279163','Carla','Gutierrez','89012345','+1 555 890-1234','369 Ash St, Anytown, USA'),
	 ('d4a0f22e-2696-49af-aa30-e00f9df291e3','Daniel','Mendez','90123456','+1 555 901-2345','582 Walnut St, Anytown, USA'),
	 ('d500f7b1-3792-4f9f-95fd-bca0173f80cd','Isabella','Sanchez','01234567','+1 555 012-3456','703 Birch St, Anytown, USA');
  `,
  courses: `
  INSERT INTO public.course (id, fullname, abbreviation, credits, description, "professorId") VALUES
    ('09331022-d926-4d9b-abdb-20a85b93df24', 'Historia del Perú', 'HdP', 2, 'Historia del Perú y el proceso del virrainato', '130a2e85-a084-4f36-8112-095d5bcfc80f'),
    ('7730a7ca-61cc-46a3-9702-eb170cad407e', 'Propedeutica', 'Pd', 2, 'Propedeutica de la ciencia', '130a2e85-a084-4f36-8112-095d5bcfc80f'),
    ('f695203b-93d6-4a06-b45b-257471a82661', 'Dibujo Técnico', 'DT', 2, 'Dibujo de solidos en octantes', '130a2e85-a084-4f36-8112-095d5bcfc80f'),
    ('7967dd4a-6924-4402-aea7-b41abeb7930d', 'Matemática Discreta', 'MDt', 2, 'Estudio de sólidos en octantes', '130a2e85-a084-4f36-8112-095d5bcfc80f'),
    ('53a2d638-47df-405b-ae17-39c99a1b4d5d', 'Ingeniería de los materiales', 'Mt', 2, 'Estudio de materiales', '130a2e85-a084-4f36-8112-095d5bcfc80f');
  `,
  enrollments: `
  INSERT INTO public.enrollment (id, "program", description, "studentId") VALUES
    ('1fdc8477-0f85-4301-a307-cb9c4b6e1b35', 'Ing. Mecánica', 'Ing. Mecánica', 'f5183f00-2dc7-43ba-986a-968dac871990');
  `,
  enrollCourses: `
  INSERT INTO public.enroll_course (id, "courseId", "enrollmentId") VALUES
    ('e1cd13be-c633-46cd-b170-ac13f7c8122e', '09331022-d926-4d9b-abdb-20a85b93df24', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35'),
    ('6bd5d1ab-feb0-444c-ae05-04a1a892e1d2', '7730a7ca-61cc-46a3-9702-eb170cad407e', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35'),
    ('0f51b59f-70e7-45fb-83c4-44a8ce4daa66', 'f695203b-93d6-4a06-b45b-257471a82661', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35'),
    ('e8c31b76-c1c0-40dd-9e09-14f9332ec679', '7967dd4a-6924-4402-aea7-b41abeb7930d', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35'),
    ('d45ec67e-ce36-4931-ac3b-404bec7479a3', '53a2d638-47df-405b-ae17-39c99a1b4d5d', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35');
  `,
};
