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

INSERT INTO public.student (id, firstname, lastname, dni, phone, address) VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Maggie', 'Burns', '48237357', '416-555-2315', '123 Main St'),
    ('b6c10ef6-91f6-4269-9a79-04a1a7c53af1', 'Jared', 'Sanchez', '73165489', '646-555-8249', '456 Oak Ave'),
    ('31f07663-f0e6-4d6b-b822-52aee0fdd2a9', 'Miriam', 'Nguyen', '60321744', '905-555-1628', '789 Elm St'),
    ('d3a014e3-cf5f-45f3-8d2c-af99a62b90a1', 'Jonas', 'Peterson', '86590213', '415-555-3387', '456 Pine St'),
    ('1e45e79d-28ab-4609-9d34-177328a84f1e', 'Nia', 'Hall', '29376418', '212-555-9034', '567 8th Ave'),
    ('944eaa24-cd3d-4373-a63f-d49a6c2910cc', 'Milo', 'Hughes', '50864937', '310-555-5432', '321 Maple Ave'),
    ('b27cfc8a-52f4-4a2a-907d-6d3459c01a04', 'Avery', 'Rivera', '78420189', '202-555-0187', '654 Birch St'),
    ('2bbf8cc5-60cc-4c4c-8a3d-1c4ad2bdcf02', 'Charlie', 'Martin', '24053590', '617-555-3221', '987 Hilltop Rd'),
    ('2f18bdec-9a5f-4d7b-870a-4f73e335c08d', 'Lena', 'Morris', '43987345', '647-555-4736', '741 Forest Dr'),
    ('a2d8b836-bb38-4efc-b53b-09c21a61e539', 'Devon', 'Evans', '71728645', '647-555-1083', '852 Sunset Blvd');

INSERT INTO public.course (id, fullname, abbreviation, credits, description, "professorId") VALUES
  ('09331022-d926-4d9b-abdb-20a85b93df24', 'Historia del Perú', 'HdP', 2, 'Historia del Perú y el proceso del virrainato', '130a2e85-a084-4f36-8112-095d5bcfc80f'),
  ('7730a7ca-61cc-46a3-9702-eb170cad407e', 'Propedeutica', 'Pd', 2, 'Propedeutica de la ciencia', '130a2e85-a084-4f36-8112-095d5bcfc80f'),
  ('f695203b-93d6-4a06-b45b-257471a82661', 'Dibujo Técnico', 'DT', 2, 'Dibujo de solidos en octantes', '130a2e85-a084-4f36-8112-095d5bcfc80f'),
  ('7967dd4a-6924-4402-aea7-b41abeb7930d', 'Matemática Discreta', 'MDt', 2, 'Estudio de sólidos en octantes', '130a2e85-a084-4f36-8112-095d5bcfc80f'),
  ('53a2d638-47df-405b-ae17-39c99a1b4d5d', 'Ingeniería de los materiales', 'Mt', 2, 'Estudio de materiales', '130a2e85-a084-4f36-8112-095d5bcfc80f');

INSERT INTO public.enrollment (id, "program", description, "studentId") VALUES
    ('1fdc8477-0f85-4301-a307-cb9c4b6e1b35', 'Ing. Mecánica', 'Ing. Mecánica', 'a2d8b836-bb38-4efc-b53b-09c21a61e539');

INSERT INTO public.enroll_course (id, "courseId", "enrollmentId") VALUES
    ('e1cd13be-c633-46cd-b170-ac13f7c8122e', '09331022-d926-4d9b-abdb-20a85b93df24', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35'),
    ('6bd5d1ab-feb0-444c-ae05-04a1a892e1d2', '7730a7ca-61cc-46a3-9702-eb170cad407e', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35'),
    ('0f51b59f-70e7-45fb-83c4-44a8ce4daa66', 'f695203b-93d6-4a06-b45b-257471a82661', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35'),
    ('e8c31b76-c1c0-40dd-9e09-14f9332ec679', '7967dd4a-6924-4402-aea7-b41abeb7930d', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35'),
    ('d45ec67e-ce36-4931-ac3b-404bec7479a3', '53a2d638-47df-405b-ae17-39c99a1b4d5d', '1fdc8477-0f85-4301-a307-cb9c4b6e1b35');
