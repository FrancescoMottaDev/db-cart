CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE "role" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "user_roles" (
  "user_id" integer,
  "role_id" integer,
  PRIMARY KEY ("user_id", "role_id")
);

CREATE TABLE "permission" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "role_permissions" (
  "role_id" integer,
  "permission_id" integer,
  PRIMARY KEY ("role_id", "permission_id")
);

CREATE TABLE "customer" (
  "id" integer PRIMARY KEY,
  "email" varchar,
  "user_id" integer,
  "customer_group_id" integer
);

CREATE TABLE "customer_group" (
  "id" integer PRIMARY KEY
);

CREATE TABLE "region" (
  "id" integer PRIMARY KEY,
  "code" varchar,
  "name" varchar,
  "parent" integer,
  "type" varchar
);

CREATE TABLE "zone" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "zone_regions" (
  "zone_id" integer,
  "region_id" integer,
  PRIMARY KEY ("zone_id", "region_id")
);

CREATE TABLE "customer_address" (
  "id" integer PRIMARY KEY,
  "customer_id" integer,
  "is_default_shipping" boolean,
  "is_default_billing" boolean,
  "full_name" varchar,
  "company" varchar,
  "street_line_1" varchar,
  "street_line_2" varchar,
  "city" varchar,
  "province" varchar,
  "zip_code" varchar,
  "phone_number" varchar,
  "country_id" integer
);

CREATE TABLE "collection" (
  "id" integer PRIMARY KEY,
  "code" varchar,
  "name" varchar,
  "parent_collection_id" integer
);

CREATE TABLE "product" (
  "id" integer PRIMARY KEY,
  "sku" varchar UNIQUE,
  "collection_id" integer,
  "featured_image_id" integer,
  "custom_fields" json
);

CREATE TABLE "product_option" (
  "id" integer PRIMARY KEY,
  "product_id" integer
);

CREATE TABLE "product_option_value" (
  "id" integer PRIMARY KEY,
  "value" varchar,
  "option_id" integer
);

CREATE TABLE "product_variant" (
  "id" integer PRIMARY KEY,
  "product_id" integer,
  "tax_category_id" integer,
  "shipping_category_id" integer,
  "featured_image_id" integer,
  "price" integer,
  "custom_fields" json,
  CONSTRAINT "chk_positive_price" CHECK (price >= 0)
);

CREATE TABLE "product_variant_customization" (
  "id" integer PRIMARY KEY,
  "product_variant_id" integer,
  "order_line_item" integer
);

CREATE TABLE "product_variant_options" (
  "product_variant_id" integer,
  "product_options_id" integer,
  PRIMARY KEY ("product_variant_id", "product_options_id")
);

CREATE TABLE "attribute" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "attribute_value" (
  "id" integer PRIMARY KEY,
  "attribute_id" integer,
  "name" varchar
);

CREATE TABLE "product_attributes" (
  "product_id" integer,
  "attribute_value_id" integer,
  PRIMARY KEY ("product_id", "attribute_value_id")
);

CREATE TABLE "product_variant_attributes" (
  "product_variant_id" integer,
  "attribute_value_id" integer,
  PRIMARY KEY ("product_variant_id", "attribute_value_id")
);

CREATE TABLE "asset" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "width" integer,
  "height" integer
);

CREATE TABLE "product_assets" (
  "product_id" integer,
  "asset_id" integer,
  "order" integer,
  PRIMARY KEY ("product_id", "asset_id")
);

CREATE TABLE "product_variant_assets" (
  "product_variant_id" integer,
  "asset_id" integer,
  "order" integer,
  PRIMARY KEY ("product_variant_id", "asset_id")
);

CREATE TABLE "tax_category" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "shipping_category" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "bundle" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "price" integer
);

CREATE TABLE "bundle_products" (
  "bundle_id" integer,
  "product_variant_id" integer
);

CREATE TABLE "wish_list" (
  "id" integer PRIMARY KEY,
  "channel_id" integer,
  "customer_id" integer,
  "name" varchar
);

CREATE TABLE "wish_list_products" (
  "wish_list_id" integer,
  "product_variant_id" integer
);

CREATE TABLE "order" (
  "id" integer PRIMARY KEY,
  "channel_id" integer,
  "customer_id" integer,
  "billing_address_id" integer,
  "shipping_address_id" integer,
  "payment_method_id" integer,
  "shipping_method_id" integer,
  "status" varchar,
  "is_guest" boolean
);

CREATE TABLE "order_line_item" (
  "id" integer PRIMARY KEY,
  "order_id" integer,
  "product_variant_id" integer,
  "quantity" integer,
  CONSTRAINT "chk_positive_quantity" CHECK (quantity > 0)
);

CREATE TABLE "payment_method" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "shipping_method" (
  "id" integer PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "payment" (
  "id" integer PRIMARY KEY,
  "order_id" integer,
  "payment_method_id" integer,
  "status" varchar,
  "payment_metadata" json
);

CREATE TABLE "shipment" (
  "id" integer PRIMARY KEY,
  "order_id" integer,
  "from_stock_location" integer
);

CREATE TABLE "shipped_items" (
  "shipment_id" integer,
  "order_line_item_id" integer,
  PRIMARY KEY ("shipment_id", "order_line_item_id")
);

CREATE TABLE "return" (
  "id" integer PRIMARY KEY,
  "order_id" integer
);

CREATE TABLE "return_line_items" (
  "return_id" integer,
  "order_line_item_id" integer,
  PRIMARY KEY ("return_id", "order_line_item_id")
);

CREATE TABLE "refund" (
  "id" integer PRIMARY KEY,
  "order_id" integer,
  "return_id" integer,
  "payment_id" integer,
  "amount" integer
);

CREATE TABLE "stock_location" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "shipping_priority" integer
);

CREATE TABLE "stock_level" (
  "stock_location_id" integer,
  "product_variant_id" integer,
  "quantity_available" integer,
  "quantity_allocated" integer,
  "quantity_reserved" integer,
  PRIMARY KEY ("stock_location_id", "product_variant_id")
);

CREATE TABLE "stock_reservation" (
  "id" integer PRIMARY KEY,
  "status" varchar,
  "order_line_item_id" integer,
  "product_variant_id" integer,
  "quantity" integer,
  "expires_at" timestamp
);

CREATE TABLE "gift_card" (
  "id" integer PRIMARY KEY,
  "channel_id" integer,
  "name" varchar,
  "amount" integer,
  "from_name" varchar,
  "gift_message" varchar,
  "recipient_name" varchar,
  "recipient_email" varchar
);

CREATE UNIQUE INDEX ON "region" ("code", "type", "parent");

COMMENT ON COLUMN "customer"."user_id" IS 'Can buy as a guest';

COMMENT ON COLUMN "order"."status" IS '"anonymous_cart", "cart", "placed", "paid", "fulfilled"';

COMMENT ON COLUMN "stock_reservation"."status" IS '"cart" or "order"';

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("id");

ALTER TABLE "role_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "permission" ("id");

ALTER TABLE "customer" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "customer" ADD FOREIGN KEY ("customer_group_id") REFERENCES "customer_group" ("id");

ALTER TABLE "region" ADD FOREIGN KEY ("parent") REFERENCES "region" ("id");

ALTER TABLE "zone_regions" ADD FOREIGN KEY ("zone_id") REFERENCES "zone" ("id");

ALTER TABLE "zone_regions" ADD FOREIGN KEY ("region_id") REFERENCES "region" ("id");

ALTER TABLE "customer_address" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");

ALTER TABLE "customer_address" ADD FOREIGN KEY ("country_id") REFERENCES "region" ("id");

ALTER TABLE "collection" ADD FOREIGN KEY ("parent_collection_id") REFERENCES "collection" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("collection_id") REFERENCES "collection" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("featured_image_id") REFERENCES "asset" ("id");

ALTER TABLE "product_option" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_option_value" ADD FOREIGN KEY ("option_id") REFERENCES "product_option" ("id");

ALTER TABLE "product_variant" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_variant" ADD FOREIGN KEY ("tax_category_id") REFERENCES "tax_category" ("id");

ALTER TABLE "product_variant" ADD FOREIGN KEY ("shipping_category_id") REFERENCES "shipping_category" ("id");

ALTER TABLE "product_variant" ADD FOREIGN KEY ("featured_image_id") REFERENCES "asset" ("id");

ALTER TABLE "product_variant_customization" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("id");

ALTER TABLE "product_variant_customization" ADD FOREIGN KEY ("order_line_item") REFERENCES "order_line_item" ("id");

ALTER TABLE "product_variant_options" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("id");

ALTER TABLE "product_variant_options" ADD FOREIGN KEY ("product_options_id") REFERENCES "product_option_value" ("id");

ALTER TABLE "attribute_value" ADD FOREIGN KEY ("attribute_id") REFERENCES "attribute" ("id");

ALTER TABLE "product_attributes" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_attributes" ADD FOREIGN KEY ("attribute_value_id") REFERENCES "attribute_value" ("id");

ALTER TABLE "product_variant_attributes" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("id");

ALTER TABLE "product_variant_attributes" ADD FOREIGN KEY ("attribute_value_id") REFERENCES "attribute_value" ("id");

ALTER TABLE "product_assets" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_assets" ADD FOREIGN KEY ("asset_id") REFERENCES "asset" ("id");

ALTER TABLE "product_variant_assets" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("id");

ALTER TABLE "product_variant_assets" ADD FOREIGN KEY ("asset_id") REFERENCES "asset" ("id");

ALTER TABLE "bundle_products" ADD FOREIGN KEY ("bundle_id") REFERENCES "bundle" ("id");

ALTER TABLE "bundle_products" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("id");

ALTER TABLE "wish_list" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");

ALTER TABLE "wish_list_products" ADD FOREIGN KEY ("wish_list_id") REFERENCES "wish_list" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("payment_method_id") REFERENCES "payment_method" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("shipping_method_id") REFERENCES "shipping_method" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("billing_address_id") REFERENCES "customer_address" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("shipping_address_id") REFERENCES "customer_address" ("id");

ALTER TABLE "order_line_item" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_line_item" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("id");

ALTER TABLE "payment" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "payment" ADD FOREIGN KEY ("payment_method_id") REFERENCES "payment_method" ("id");

ALTER TABLE "shipment" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "shipment" ADD FOREIGN KEY ("from_stock_location") REFERENCES "stock_location" ("id");

ALTER TABLE "shipped_items" ADD FOREIGN KEY ("shipment_id") REFERENCES "shipment" ("id");

ALTER TABLE "shipped_items" ADD FOREIGN KEY ("order_line_item_id") REFERENCES "order_line_item" ("id");

ALTER TABLE "return" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "return_line_items" ADD FOREIGN KEY ("return_id") REFERENCES "return" ("id");

ALTER TABLE "return_line_items" ADD FOREIGN KEY ("order_line_item_id") REFERENCES "order_line_item" ("id");

ALTER TABLE "refund" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "refund" ADD FOREIGN KEY ("return_id") REFERENCES "return" ("id");

ALTER TABLE "refund" ADD FOREIGN KEY ("payment_id") REFERENCES "payment" ("id");

ALTER TABLE "stock_level" ADD FOREIGN KEY ("stock_location_id") REFERENCES "stock_location" ("id");

ALTER TABLE "stock_level" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("id");

ALTER TABLE "stock_reservation" ADD FOREIGN KEY ("order_line_item_id") REFERENCES "order_line_item" ("id");

ALTER TABLE "stock_reservation" ADD FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("id");
