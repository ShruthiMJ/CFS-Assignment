import { randomInt, randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";

const apiBaseUrl = process.env.PETSTORE_API_URL || "https://petstore.swagger.io/v2";
const requestTimeout = 45_000;

test("creates, reads, updates, and deletes a pet", async ({ request }) => {
  test.setTimeout(180_000);

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

  const createResponse = await request.post(`${apiBaseUrl}/pet`, {
    data: pet,
    timeout: requestTimeout,
  });
  console.log(`Create status: ${createResponse.status()}`);
  expect(createResponse.status()).toBe(200);
  expect(await createResponse.json()).toMatchObject({ id: petId, name: originalName });

  const readResponse = await request.get(`${apiBaseUrl}/pet/${petId}`, {
    timeout: requestTimeout,
  });
  console.log(`Read status: ${readResponse.status()}`);
  expect(readResponse.status()).toBe(200);
  expect(await readResponse.json()).toMatchObject({ id: petId, name: originalName });

  const updateResponse = await request.put(`${apiBaseUrl}/pet`, {
    data: { ...pet, name: updatedName },
    timeout: requestTimeout,
  });
  console.log(`Update status: ${updateResponse.status()}`);
  expect(updateResponse.status()).toBe(200);
  expect(await updateResponse.json()).toMatchObject({ id: petId, name: updatedName });

  const deleteResponse = await request.delete(`${apiBaseUrl}/pet/${petId}`, {
    timeout: requestTimeout,
  });
  console.log(`Delete status: ${deleteResponse.status()}`);
  expect(deleteResponse.status()).toBe(200);

  const missingResponse = await request.get(`${apiBaseUrl}/pet/${petId}`, {
    timeout: requestTimeout,
  });
  console.log(`Read after delete status: ${missingResponse.status()}`);
  expect(missingResponse.status()).toBe(404);
});
