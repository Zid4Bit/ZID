/**
 * Project: POC PaaS
 * <pre>
 *
 * Last change:
 *
 *  by: $Author: bomc $
 *
 *  date: $Date: $
 *
 *  revision: $Revision: $
 *
 * </pre>
 */
package de.bomc.poc.hrm.domain;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import de.bomc.poc.hrm.domain.model.basis.AbstractEntity;
import de.bomc.poc.hrm.domain.model.basis.CustomLocalDateSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * This entity represents a customer.
 * 
 * @author <a href="mailto:bomc@bomc.org">bomc</a>
 * @since 06.05.2019
 */
// Lombok
@AllArgsConstructor
@Builder
@Getter
@Setter
// JPA
@Entity
@Table(name = "T_CUSTOMER")
@NamedQueries({
		@NamedQuery(name = "Customer.NQ_FIND_CUSTOMER_BY_EMAIL_ADDRESS", query = "SELECT c FROM CustomerEntity c WHERE c.emailAddress = :emailAddress"),
		@NamedQuery(name = "Customer.NQ_FIND_CUSTOMER_BY_ID", query = "SELECT c FROM CustomerEntity c WHERE c.id= :id") })
public class CustomerEntity extends AbstractEntity<CustomerEntity> implements Serializable {

	/**
	 * The serial UID.
	 */
	private static final long serialVersionUID = -1121920457428004273L;

	/* --------------------- constants ------------------------------ */
	/**
	 * The default prefix String for each created
	 * <code>CustomerEntity</code>-NamedQuery.
	 */
	protected static final String NQ_PREFIX = "CUSTOMER.";
	/**
	 * <pre>
	 * Query to find customer by email address.
	 * <li>
	 * 	Query parameter name <strong>emailAddress</strong> : The emailAddress of the <code>Customer</code> to search for.
	 * </li>
	 * Name is {@value}.
	 * </pre>
	 */
	public static final String NQ_FIND_CUSTOMER_BY_EMAIL_ADDRESS = NQ_PREFIX + "findByEmailAddress";

	/* --------------------- columns -------------------------------- */
	@Column(name = "C_EMAIL_ADDRESS", unique = true)
	private String emailAddress;

	@Column(name = "C_PHONE_NUMBER", length = 30)
	private String phoneNumber;

	@Column(name = "C_FIRST_NAME", length = 40)
	private String firstName;

	@Column(name = "C_LAST_NAME", length = 40)
	private String lastName;

	@Column(name = "C_DATE_OF_BIRTH", nullable = false)
	@JsonSerialize(using = CustomLocalDateSerializer.class)
	private LocalDate dateOfBirth;

	@Column(name = "C_CITY", length = 40)
	private String city;

	@Column(name = "C_POSTAL_CODE", length = 10)
	private String postalCode;

	@Column(name = "C_STREET", length = 60)
	private String street;

	@Column(name = "C_HOUSE_NUMBER", length = 10)
	private String houseNumber;

	@Column(name = "C_COUNTRY", length = 3)
	private String country;

	/* --------------------- associations --------------------------- */

	/* --------------------- constructors --------------------------- */
	public CustomerEntity() {
		// Used by Jpa-Provider.

	}

    /* ----------------------------- methods ------------------------- */
	
    /**
     * @return the type of this entity.
     */
    @Override
    protected Class<CustomerEntity> getEntityClass() {
        return CustomerEntity.class;
    }

	@Override
	public String toString() {
		return "CustomerEntity [emailAddress=" + emailAddress + ", phoneNumber=" + phoneNumber + ", firstName="
				+ firstName + ", lastName=" + lastName + ", dateOfBirth=" + dateOfBirth + ", city=" + city
				+ ", postalCode=" + postalCode + ", street=" + street + ", houseNumber=" + houseNumber + ", country="
				+ country + "]";
	}

}
