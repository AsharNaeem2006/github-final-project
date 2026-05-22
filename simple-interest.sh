#!/bin/bash

# Script to calculate simple interest based on user input
# Formula: Simple Interest = (Principal * Rate * Time) / 100

echo "----------------------------------------"
echo "       Simple Interest Calculator       "
echo "----------------------------------------"

# Read user input for Principal
read -p "Enter the principal amount: " principal

# Read user input for Rate of Interest
read -p "Enter the annual rate of interest (in %): " rate

# Read user input for Time period
read -p "Enter the time period (in years): " time

# Calculate simple interest using 'bc' to handle potential decimal values
interest=$(echo "scale=2; ($principal * $rate * $time) / 100" | bc)

echo "----------------------------------------"
echo "Calculated Simple Interest: $interest"
echo "----------------------------------------"
