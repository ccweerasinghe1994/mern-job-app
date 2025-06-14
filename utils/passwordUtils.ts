/**
 * @fileoverview Password utility functions for secure password hashing and comparison
 *
 * This module provides utilities for:
 * - Hashing passwords using bcrypt with configurable salt rounds
 * - Comparing plain text passwords with hashed passwords
 *
 * @author ccwwerasinghe1994
 * @version 1.0.0
 * @since 2025-06-12
 */

import bcrypt from "bcryptjs";

/**
 * Hashes a plain text password using bcrypt with salt
 *
 * This function generates a salt and hashes the provided password using bcrypt.
 * The salt rounds determine the computational cost of hashing - higher values
 * are more secure but take longer to compute.
 *
 * @param {string} password - The plain text password to hash
 * @param {number} [saltRounds=10] - The number of salt rounds (default: 10)
 *   - 10 rounds: ~10ms (recommended for most applications)
 *   - 12 rounds: ~60ms (higher security)
 *   - 15 rounds: ~5 seconds (very high security)
 *
 * @returns {Promise<string>} A promise that resolves to the hashed password
 *
 * @throws {Error} Throws an error if hashing fails
 *
 * @example
 * // Basic usage with default salt rounds (10)
 * const hashedPassword = await hashPassword("mySecretPassword");
 * console.log(hashedPassword); // "$2a$10$N9qo8uLOickgx2ZMRZoMye..."
 *
 * @example
 * // Using custom salt rounds for higher security
 * const hashedPassword = await hashPassword("mySecretPassword", 12);
 * console.log(hashedPassword); // "$2a$12$N9qo8uLOickgx2ZMRZoMye..."
 *
 * @example
 * // Usage in user registration
 * async function registerUser(email: string, password: string) {
 *   try {
 *     const hashedPassword = await hashPassword(password);
 *     const user = await User.create({
 *       email,
 *       password: hashedPassword
 *     });
 *     return user;
 *   } catch (error) {
 *     console.error("Registration failed:", error);
 *     throw error;
 *   }
 * }
 */
async function hashPassword(
  password: string,
  saltRounds: number = 10
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}

/**
 * Compares a plain text password with a hashed password
 *
 * This function uses bcrypt's compare method to securely verify if a plain text
 * password matches a previously hashed password. It's safe against timing attacks
 * and handles the salt extraction automatically.
 *
 * @param {string} passwordFromRequest - The plain text password to verify
 * @param {string} passwordFromDbHashed - The hashed password from database
 *
 * @returns {Promise<boolean>} A promise that resolves to:
 *   - `true` if the passwords match
 *   - `false` if the passwords don't match
 *
 * @throws {Error} Throws an error if comparison fails due to invalid hash format
 *
 * @example
 * // Basic usage in login authentication
 * const isValid = await comparePassword("userInputPassword", hashedPasswordFromDB);
 * if (isValid) {
 *   console.log("Login successful!");
 * } else {
 *   console.log("Invalid credentials");
 * }
 *
 * @example
 * // Usage in login controller
 * async function loginUser(email: string, password: string) {
 *   try {
 *     const user = await User.findOne({ email });
 *     if (!user) {
 *       throw new Error("User not found");
 *     }
 *
 *     const isPasswordValid = await comparePassword(password, user.password);
 *     if (!isPasswordValid) {
 *       throw new Error("Invalid credentials");
 *     }
 *
 *     return { success: true, user };
 *   } catch (error) {
 *     console.error("Login failed:", error);
 *     throw error;
 *   }
 * }
 *
 * @example
 * // Usage with error handling
 * try {
 *   const isMatch = await comparePassword("plainPassword", "$2a$10$invalidHash");
 * } catch (error) {
 *   console.error("Invalid hash format:", error.message);
 * }
 */
async function comparePassword(
  passwordFromRequest: string,
  passwordFromDbHashed: string
): Promise<boolean> {
  return bcrypt.compare(passwordFromRequest, passwordFromDbHashed);
}

/**
 * Exported password utility functions
 *
 * @example
 * // Import individual functions
 * import { hashPassword, comparePassword } from './utils/passwordUtils';
 *
 * @example
 * // Import all functions
 * import * as passwordUtils from './utils/passwordUtils';
 * const hashedPassword = await passwordUtils.hashPassword("myPassword");
 */
export { comparePassword, hashPassword };
