import { randomInt, randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";

const apiBaseUrl = process.env.PETSTORE_API_URL || "https://petstore.swagger.io/v2";
const requestTimeout = 45_000;

test("creates, reads, updates, and deletes a pet", async ({ context }) => {
  test.setTimeout(180_000);

  const request = context.request;
  const petId = randomInt(1_000_000_000, 2_000_000_000);
  const originalName = `playwright-pet-${randomUUID()}`;
  const updatedName = `${originalName}-updated`;
  const pet = {
    id: petId,
    category: { id: 1, name: "automation" },
    name: originalName,
    photoUrls: [],
    tags: [{ id: 1, name: "playwright" }],
    status: "available",
  };

  console.log(`Creating pet ${petId}.`);
  const createResponse = await request.post(`${apiBaseUrl}/pet`, {
    data: pet,
    timeout: requestTimeout,
  });
  expect(createResponse.status()).toBe(200);
  expect(await createResponse.json()).toMatchObject({ id: petId, name: originalName });
  console.log(`Pet created successfully (HTTP ${createResponse.status()}).`);

  console.log(`Reading pet ${petId}.`);
  const readResponse = await request.get(`${apiBaseUrl}/pet/${petId}`, {
    timeout: requestTimeout,
  });
  expect(readResponse.status()).toBe(200);
  expect(await readResponse.json()).toMatchObject({ id: petId, name: originalName });
  console.log(`Pet read successfully (HTTP ${readResponse.status()}).`);

  console.log(`Updating pet ${petId}.`);
  const updateResponse = await request.put(`${apiBaseUrl}/pet`, {
    data: { ...pet, name: updatedName },
    timeout: requestTimeout,
  });
  expect(updateResponse.status()).toBe(200);
  expect(await updateResponse.json()).toMatchObject({ id: petId, name: updatedName });
  console.log(`Pet updated successfully (HTTP ${updateResponse.status()}).`);

  console.log(`Deleting pet ${petId}.`);
  const deleteResponse = await request.delete(`${apiBaseUrl}/pet/${petId}`, {
    timeout: requestTimeout,
  });
  expect(deleteResponse.status()).toBe(200);
  console.log(`Pet deleted successfully (HTTP ${deleteResponse.status()}).`);

  console.log(`Confirming pet ${petId} is no longer available.`);
  const missingResponse = await request.get(`${apiBaseUrl}/pet/${petId}`, {
    timeout: requestTimeout,
  });
  expect(missingResponse.status()).toBe(404);
  console.log(
    `Pet is no longer available as expected (HTTP ${missingResponse.status()}).`,
  );
});
