use std::fs::File;
use std::io::BufReader;
use std::io::BufRead;

fn main() {
    // --snip--
    // let args: Vec<String> = env::args().collect();

    // let query = &args[1];
    // let filename = &args[2];

    // println!("Searching for {}", query);
    // println!("In file {}", filename);

    let contents = load_from_file("./day1input1.txt");
    // let part1Answer =  part1(contents);
    // println!("Part 1 {}", part1Answer);
    let part2Answer =  part2(contents);
    println!("Part 2 {}", part2Answer);
}

fn part1(input: Vec<i32>) -> i32 {
  let mut increases = 0;
  let mut lastVal = 0;
  for val in input.iter() {
    if &lastVal < val {
      increases += 1;
    }
    lastVal = *val;
  }
  return increases - 1;
}

fn part2(input: Vec<i32>) -> i32 {
  let mut increases = 0;
  let mut lastSum = 0;
  let mut currentSum = 0;
  
  for (index, val) in input.iter().enumerate() {
    if index > 1 && index < 1999 {
      println!("Part 2 previous values {} {} {}", input[index-1], input[index-2], val);
      currentSum = val + input[index-1] + input[index-2];
      lastSum = val + input[index-1] + input[index+1];
      println!("Part 2 compare {} {} ", currentSum, lastSum);
      if lastSum > currentSum {
        increases += 1;
      }
    }
  }
  return increases;
}

fn load_from_file(file_path: &str) -> Vec<i32> {
    let file = File::open(file_path).expect("file wasn't found.");
    let reader = BufReader::new(file);

    let numbers: Vec<i32> = reader
        .lines()
        .map(|line| line.unwrap().parse::<i32>().unwrap())
        .collect();
    return numbers;
}