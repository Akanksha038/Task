import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent {
  rows: number = 12; // Total rows
  seatsPerRow: number = 7; // Standard seats per row
  seats: number[][]; // 2D array to hold seat status
  bookedSeats: number[] = []; // To store booked seats
  message: string = ''; // To display messages to the user

  constructor() {
    this.initializeSeats();
  }

  // Initialize the seats
  initializeSeats() {
    this.seats = Array.from({ length: this.rows }, (_, rowIndex) => {
      if (rowIndex === this.rows - 1) {
        return Array(3).fill(0); // Last row has 3 seats
      }
      return Array(this.seatsPerRow).fill(0); // Other rows have 7 seats
    });

    // Pre-book some seats for testing
    this.seats[0][0] = 1; // Example of a booked seat
    this.seats[2][5] = 1; // Another booked seat
  }

  // Book seats function
  bookSeats(requiredSeats: number) {
    if (requiredSeats < 1 || requiredSeats > 7) {
      this.message = 'You can book between 1 to 7 seats only.';
      return;
    }

    for (let row = 0; row < this.rows; row++) {
      let availableSeatsInRow = this.getAvailableSeatsInRow(row);
      if (availableSeatsInRow.length >= requiredSeats) {
        const seatsToBook = availableSeatsInRow.slice(0, requiredSeats);
        this.bookedSeats.push(...seatsToBook);
        seatsToBook.forEach(seat => {
          this.seats[row][seat] = 1; // Mark seat as booked
        });
        this.message = `Booked row: ${row + 1}<br>Booked seats: ${seatsToBook.map(s => s + 1).join(', ')}`;

        return;
      }
    }

    this.message = 'Not enough available seats to book.';
  }

  // Get available seats in a row
  getAvailableSeatsInRow(row: number): number[] {
    return this.seats[row].map((status, index) => (status === 0 ? index : -1)).filter(index => index !== -1);
  }
}
