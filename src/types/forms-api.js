/**
 * Expected response from GET /api/v1/public/forms/:id/fields
 * Used to render formation registration forms dynamically.
 *
 * @typedef {Object} PublicFormFieldsResponse
 * @property {string} form_id - Form UUID
 * @property {PublicFormField[]} fields - Array of field definitions, ordered by `order`
 *
 * @typedef {Object} PublicFormField
 * @property {string} id - Field UUID
 * @property {string} form_id - Form UUID
 * @property {string} label - Display label; also used as key in submission payload (data[label] = value)
 * @property {string} type - One of: "text" | "email" | "number" | "date" | "datetime" | "select" | "radio" | "checkbox" | "textarea" | "file" | "url" | "phone"
 * @property {boolean} required
 * @property {string[]} [options] - For select, radio, checkbox
 * @property {boolean} [allow_custom_input] - Show custom input when "Others" option is selected
 * @property {string} [custom_input_label] - Placeholder for custom input
 * @property {string} [others_option_text] - Text for the "Others" option (e.g. "أخرى")
 * @property {{ min_length?: number, max_length?: number, unique?: boolean, pattern?: string, error_message?: string }} [validation]
 * @property {number} order - Display order
 * @property {string} [placeholder]
 * @property {string} [help_text]
 */

export {};
