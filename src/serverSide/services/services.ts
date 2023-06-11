import { Member } from "~/types";
import { Postcodes } from "~/types";
import { Contry } from "~/types";
class DummyDatabase {
  members: Member[] = [];
  postcodes: Postcodes[] = [];
  countries: Contry[] = [];

  constructor() {
    this.fillWithDummyData();
  }

  fillWithDummyData() {
    this.members.push({
      m_id: 1,
      name: "John Doe",
      adress1: "Adress1",
      adress2: "Adress2",
      postcode: "12345",
      city: "City",
      country: "Country",
      phone: ["123-456-7890"],
      mail: "john@doe.com",
      created: "2023-01-01",
    });

    this.postcodes.push(
      { postcode: 12345, city: "City1" },
      { postcode: 23456, city: "City2" },
      { postcode: 34567, city: "City3" }
    );

    this.countries.push(
      { contrycode: "US", contryname: "United States" },
      { contrycode: "GB", contryname: "United Kingdom" },
      { contrycode: "DE", contryname: "Germany" }
    );
  }

  searchName(name: string): Member[] {
    return this.members
      .filter((member) =>
        member.name?.toLowerCase().includes(name.toLowerCase())
      )
      .slice(0, 10);
  }

  getPostcode(): Postcodes[] {
    return this.postcodes;
  }

  getCountry(): Contry[] {
    return this.countries;
  }

  getMember(id: number): Member | undefined {
    return this.members.find((member) => member.m_id === id);
  }

  newMember(member: Member): Member {
    const id = this.members.length + 1;
    member.m_id = id;
    member.created = new Date().toISOString().slice(0, 10);
    this.members.push(member);
    return member;
  }

  updateMember(updatedMember: Member): Member {
    const index = this.members.findIndex(
      (member) => member.m_id === updatedMember.m_id
    );
    if (index > -1) {
      this.members[index] = updatedMember;
    }
    return updatedMember;
  }

  updateName(updatedMember: Member): Member {
    const index = this.members.findIndex(
      (member) => member.m_id === updatedMember.m_id
    );
    if (index > -1) {
      this.members[index].name = updatedMember.name;
    }
    return updatedMember;
  }
}

export const DummyDatabaseInstance = new DummyDatabase();
