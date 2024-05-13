-- 1
INSERT INTO public.account ([account_firstname], [account_lastname] ,[account_email], [account_password])
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');
-- 2
UPDATE account_type
WHERE account_type = 'Admin';
-- 3
DELETE FROM public
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';
-- 4
REPLACE('GM', 'a huge interior', 'small interiors');
-- 5
SELECT inv_make, inv_model
FROM public.inventory
JOIN public.classification
ON public.inventory.inv_id = public.classification.classification_name
WHERE classification_name = 'Sports';
-- 6
REPLACE('inv_image', '/images', '/images/vehicles'), 
REPLACE('inv_thumbnails', '/images', '/images/vehicles');
