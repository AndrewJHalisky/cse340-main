-- Create the Reviews table

CREATE TABLE IF NOT EXISTS public.reviews 
(
    review_id integer NOT NULL,
    review_text text NOT NULL,
    review_date timestamp NOT NULL,
    inv_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    CONSTRAINT inv_pkey PRIMARY KEY (inv_id)
    account_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY
    CONSTRAINT account_pkey PRIMARY KEY (account_id)
)

-- Create relationship between inventory and reviews tables

ALTER TABLE IF EXISTS public.inventory
	ADD CONSTRAINT fk_classification FOREIGN KEY (classification_id)
	REFERENCES public.classification (classification_id) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE NO ACTION;

-- Create relationship between account and reviews tables


-- Insert 2 reviews into the table

INSERT INTO public.reviews
VALUES (
    1,
    'This one has to be the greatest of them all! I cannot stop looking at the detail of this gem because it is just like how it is in the movie!',
    '2024-06-01 01:03:54.687',
    2,
    40
), (
    2,
    'I really like the mileage of this one. It has more miles than you can expect, which means it will last for a long time.',
    '2024-06-01 01:45:22.778',
    1,
    41
);

